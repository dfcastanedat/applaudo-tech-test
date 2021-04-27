export const getImgUrl = (
  thumbnailUrl: string,
  variant: string,
  type: string
) => {
  if (thumbnailUrl && type) {
    return `${thumbnailUrl}/${variant}.${type}`;
  } else {
    return null;
  }
};
