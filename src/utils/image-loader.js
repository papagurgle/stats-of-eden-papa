/**
 *
 * @param {Object} param0
 * @param {String} param0.src The image source
 * @param {String} param0.width The image width
 * @param {String} param0.quality The image quality
 */
export default function myImageLoader({ src, width, quality }) {
  const isLocal = !src.startsWith('http');
  const query = new URLSearchParams();

  const imageOptimizationApi = 'transformation-rok4kk8.statsofeden.com';
  // Your NextJS application URL
  const baseUrl = 'statsofeden.com';

  const fullSrc = `${baseUrl}${src}`;

  if (width) query.set('width', width);
  if (quality) query.set('quality', quality);

  if (isLocal && process.env.NODE_ENV === 'development') {
    console.log(src, width, quality);
    return src;
  }
  if (isLocal) {
    return `${imageOptimizationApi}/${fullSrc}?${query.toString()}`;
  }
  return `${imageOptimizationApi}/${src}?${query.toString()}`;
}
