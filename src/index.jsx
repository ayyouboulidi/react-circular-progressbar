import React, {Component} from 'react';
import PropTypes from 'prop-types';

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;

/** 
 * @export
 * @class PieProgressBar
 * @extends {Component}
 */
export default class PieProgressBar extends Component {

  /**
   * Creates an instance of PieProgressBar.
   * @param {object} props 
   * @memberof PieProgressBar
   */
  constructor(props) {
    super(props);

    this.state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
    };
  }

  /**
   * default percentage on component did mount
   * 
   * @memberof PieProgressBar
   */
  componentDidMount() {
    if (this.props.initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            percentage: this.props.percentage,
          });
        });
      }, 0);
    }
  }

  /**
   * update percentage on receiving new props
   * 
   * @param {object} nextProps 
   * @memberof PieProgressBar
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      percentage: nextProps.percentage,
    });
  }

  /**
   * clear timeout on unmounting component
   * 
   * @memberof PieProgressBar
   */
  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  getBackgroundPadding() {
    if (this.props.background) {
      // default padding to be the same as strokeWidth
      // compare to null because 0 is falsy
      if (this.props.backgroundPadding == null) {
        return this.props.strokeWidth;
      }
      return this.props.backgroundPadding;
    }
    // don't add padding if not displaying background
    return 0;
  }

  getPathDescription() {
    const radius = this.getPathRadius();
    return `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;
  }

  getProgressStyle() {
    const diameter = Math.PI * 2 * this.getPathRadius();
    const truncatedPercentage = Math.min(Math.max(this.state.percentage, MIN_PERCENTAGE), MAX_PERCENTAGE);
    return {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${((100 - truncatedPercentage) / 100 * diameter)}px`,
    };
  }

  getPathRadius() {
    // the radius of the path is defined to be in the middle, so in order for the path to
    // fit perfectly inside the 100x100 viewBox, need to subtract half the strokeWidth
    return 50 - (this.props.strokeWidth / 2) - this.getBackgroundPadding();
  }

  render() {
    const { percentage, textForPercentage, className, classes, strokeWidth, backgroundImage } = this.props;
    const classForPercentage = this.props.classForPercentage ? this.props.classForPercentage(percentage) : '';
    const pathDescription = this.getPathDescription();
    const text = textForPercentage ? textForPercentage(percentage) : null;
    const image = backgroundImage !== '';
    // const {height, width} = backgroundImage ? this.imageForBackground(percentage) : null;

    return (
      <svg className={`${classes.root} ${className} ${classForPercentage}`} viewBox="0 0 100 100">
        { this.props.background ? <circle className={classes.background} cx={50} cy={50} r={50}/> : null }
        <path className={classes.trail} d={pathDescription} strokeWidth={strokeWidth} fillOpacity={0}/>
        <path className={classes.path} d={pathDescription} strokeWidth={strokeWidth} fillOpacity={0} style={this.getProgressStyle()} />
        { text ? <text className={classes.text} x={50} y={50} > {text} </text> : null }
        { image ? <image xlinkHref={backgroundImage} x={0} y={0} height="100%" width="100%"/> : null }
      </svg>
    );
  }
}


/**
   * props Validation
   * 
   * @static
   * @memberof PieProgressBar
   */
  PieProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired,
    className: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string),
    strokeWidth: PropTypes.number,
    background: PropTypes.bool,
    backgroundPadding: PropTypes.number,
    initialAnimation: PropTypes.bool,
    classForPercentage: PropTypes.func,
    backgroundImage: PropTypes.string,
    textForPercentage: PropTypes.func,
  };
  
  /**
   * default props
   * 
   * @static
   * @memberof PieProgressBar
   */
  PieProgressBar.defaultProps = {
    strokeWidth: 8,
    className: '',
    classes: {
      root: 'CircularProgressBar',
      trail: 'CircularProgressBar-trail',
      path: 'CircularProgressBar-path',
      text: 'CircularProgressBar-text',
      background: 'CircularProgressBar-background',
    },
    background: false,
    backgroundPadding: null,
    initialAnimation: false,
    backgroundImage: '',
    textForPercentage: (percentage) => `${percentage}%`,
  };