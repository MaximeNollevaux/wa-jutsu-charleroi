# ⚠ Version de Node EPINGLEE — ne pas revenir au tag flottant `node:20-alpine`.
#
# Le 2026-08-24, un rebuild sur le tag flottant a suffi a casser toutes les
# requetes HTTP sortantes de Synara One : 193 webhooks en echec en trois jours,
# contre zero avant, SANS qu'une seule ligne de code ait change. Node avait
# change le contrat du lookup DNS personnalise (`autoSelectFamily`, defaut
# depuis Node 20). Personne ne l'a vu : rien ne surveillait les envois sortants.
#
# Une montee de version doit etre un COMMIT, visible en revue — pas un effet de
# bord silencieux du prochain build. Dependabot ouvre la PR quand une nouvelle
# version sort (.github/dependabot.yml, ecosysteme `docker`).

# Stage 1: Dependencies
FROM node:26.7.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder
FROM node:26.7.0-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Stage 3: Runner
FROM node:26.7.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
