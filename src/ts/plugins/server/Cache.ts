/*
 * Silex website builder, free/libre no-code tool for makers.
 * Copyright (c) 2023 lexoyo and Silex Labs foundation
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export function noCache (req, res, next) {
  res.header('Cache-Control', 'private,no-cache,no-store,must-revalidate,proxy-revalidate')
  res.header('Expires', '-1')
  res.header('Pragma', 'no-cache')
  next()
}

export function withCache(req, res, next) {
  if (req.url.endsWith('.html') || req.url.endsWith('/')) {
    noCache(req, res, next)
  } else {
    res.header('Cache-Control', 'public,max-age=86400,immutable') // 24h
    next()
  }
}
