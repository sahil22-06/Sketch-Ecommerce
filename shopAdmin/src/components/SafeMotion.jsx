import React from 'react';

/**
 * Safe Motion Component
 * 
 * A simple wrapper that provides fallback behavior when animations are not available.
 * Since framer-motion was causing issues, this component now just renders regular HTML elements.
 * 
 * @param {Object} props
 * @param {string} props.component - The HTML element to render (e.g., 'div', 'li')
 * @param {Object} props.animationProps - Animation properties (ignored for now)
 * @param {Object} props.children - Child components
 * @param {Object} props.rest - Any other props to pass to the component
 * @returns {JSX.Element} Regular HTML element
 */
const SafeMotion = ({ component = 'div', animationProps = {}, children, ...rest }) => {
  // Simply render the component as a regular HTML element
  // Animation props are ignored to avoid any potential issues
  return React.createElement(component, rest, children);
};

export default SafeMotion; 