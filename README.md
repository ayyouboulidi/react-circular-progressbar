# React Circular Progressbar

A circular Pie progress indicator component, built with SVG. Easily customizable with CSS.

## Installation

Install the npm module:

```bash
npm install react-pie-progressbar
```

**Important**: you'll also need to copy [src/styles.css](src/styles.css) into your repo to use the default styling!

## Usage

Import the component:

```javascript
import CircularProgressbar from 'react-pie-progressbar';
```

..and use the component in your JSX:

```javascript
<CircularProgressbar percentage={60} />
```

## Props

| Name | Description |
| ---- | ----------- |
| `percentage` | Numeric percentage to display, from 0-100. Required. |
| `className` | Classes to apply to the svg element |
| `strokeWidth` | Width of circular line as a percentage relative to total width of component. Default: `8`. |
| `background` | Whether to display background color. Default: `false`. |
| `backgroundPadding` | Padding between background and edge of svg as a percentage relative to total width of component. Default: `0`. |
| `initialAnimation` | Toggle whether to animate progress starting from 0% on initial mount. Default: `false`. |
| `classForPercentage` | Function which returns an additional class to apply to top-level svg element, which can be used for coloring/styling percentage ranges differently. Example: `(percent) => percent < 100 ? 'incomplete' : 'complete'`. |
| `textForPercentage` | Function which returns text to display, can be configured based on percentage. Example: ``(pct) => `${pct}%` ``. |
| `backgroundImage` | String which has the url of the image. Default: ``. |
| `classes` | Object mapping to override classNames of each svg element (root, trail, path, text, background). Enables styling with react-jss. See [this PR](https://github.com/iqnivek/react-circular-progressbar/pull/25) for more detail. |


## Customizing styles

Use plain CSS to customize the styling - the [default CSS](src/styles.css) is a good starting point, but you can modify it as needed. There are CSS hooks for the path, trail, text, and background of the progressbar which you can customize, e.g.:

```css
.CircularProgressbar-path { stroke: red; }
.CircularProgressbar-trail { stroke: gray; }
.CircularProgressbar-text { fill: yellow; }
.CircularProgressbar-background { fill: green; }
```

You can also use the `className` prop to add different classes to the top-level SVG element, and then use that to add different themes to different instances, e.g.:

```javascript
<CircularProgressbar percentage={25} className="progressbar-red" />
<CircularProgressbar percentage={25} className="progressbar-blue" />
```

```css
.progressbar-red .CircularProgressbar-path { stroke: red; }
.progressbar-blue .CircularProgressbar-path { stroke: blue; }
```

## Development

To run demo locally on localhost:8080:

```bash
npm install
npm start
```

Keep CI tests passing by running `npm test` and `npm run lint` often.
