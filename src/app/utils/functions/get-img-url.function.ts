export const getImgUrl = (
  thumbnailUrl: string,
  variant: string,
  type: string
) => {
  return `${thumbnailUrl}/${variant}.${type}`;
};
