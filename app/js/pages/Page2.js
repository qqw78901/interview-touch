import React from 'react';
import {
  Container,
  Group,
  Slider,
} from 'amazeui-touch';

import {
  Link,
} from 'react-router';

const sliderIntance = (
  <Slider>
    <Slider.Item>
      <img src="http://s.amazeui.org/media/i/demos/bing-1.jpg" />
    </Slider.Item>
    <Slider.Item><img src="http://s.amazeui.org/media/i/demos/bing-2.jpg" />
    </Slider.Item>
    <Slider.Item>
      <img src="http://s.amazeui.org/media/i/demos/bing-3.jpg" />
    </Slider.Item>
    <Slider.Item>
      <img src="http://s.amazeui.org/media/i/demos/bing-4.jpg" />
    </Slider.Item>
  </Slider>
);
const Rt = (
  <Link to="/Page1" query={{book: 1}} >ceshi</Link>
);

export default class Page2 extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Container {...this.props}>
        <Group
          header="Page 2"
          noPadded
        >
          {sliderIntance}
          <li key={1}>{Rt}</li>
        </Group>
      </Container>
    );
  }
}
