const Title = ({ children, ...restProps }) => {
  return <h1 {...restProps}>{children}</h1>;
};

export default Title;
