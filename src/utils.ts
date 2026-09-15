export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const segment = path.replace(/^\//, '');
  return segment ? `${base}/${segment}` : `${base}/`;
}
