import React from "react";
import Lottie from "lottie-web";

const defaultOptions = {
  renderer: "canvas",
  loop: true,
  autoplay: true
};

export default class LottieIcon extends React.PureComponent {
  static defaultProps = {
    loadCallback: () => {},
    options: defaultOptions,
    width: 50,
    height: 50
  };

  componentDidMount() {
    const anim = Lottie.loadAnimation({
      container: this.container,
      ...this.props.options,
      animationData: require(`$A/lottie-file/${this.props.name}.json`)
    });
    this.props.loadCallback(anim);
  }

  render() {
    const { width, height } = this.props;
    return <div ref={c => (this.container = c)} style={{ width, height }} />;
  }
}
