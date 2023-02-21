export default (condition) => (Component) => {
    const RenderOnlyWhen = (props) => (condition(props) ? <Component {...props} /> : null);

    RenderOnlyWhen.displayName = 'RenderOnlyWhen';

    return RenderOnlyWhen;
};
