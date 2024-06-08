const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000';

const INCLUDES_FORWARD_SLASH_AT_START_REGEX = /^\/(.|\n)*$/;
const INCLUDES_FORWARD_SLASH_AT_START = (string: string) =>
  INCLUDES_FORWARD_SLASH_AT_START_REGEX.test(string);

const getUrl = (path: string) => {
  console.log('BASE_URL', BASE_URL);
  console.log('PROD_URL', process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL);
  const url = `${BASE_URL}${!INCLUDES_FORWARD_SLASH_AT_START(path) ? '/' : ''}${path}`;
  console.log('url', url);

  return url;
};

export default getUrl;
export { BASE_URL, INCLUDES_FORWARD_SLASH_AT_START, INCLUDES_FORWARD_SLASH_AT_START_REGEX };
