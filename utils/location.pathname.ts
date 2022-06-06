const pathname = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.substring(1);
  }
  return '/';
};
export default pathname;
