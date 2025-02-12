import React from 'react';
import loadable from '@loadable/component';
import cx from 'classnames';
import { RenderBlocks } from '@plone/volto/components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@eeacms/volto-tabs-block/less/carousel.less';
import { carouselSchemaEnhancer } from '@eeacms/volto-tabs-block/components/variations/carousel/schema';

const Slider = loadable(() => import('react-slick'));

const View = (props) => {
  const slider = React.useRef(null);
  const { metadata = {}, data = {}, tabsList = [], tabs = {} } = props;
  const theme = data.theme || 'light';
  const uiContainer = data.align === 'full' ? 'ui container' : false;

  const settings = {
    adaptiveHeight: true,
    autoplay: false,
    speed: 500,
    initialSlide: 1,
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

  const panes = tabsList.map((tab, _index) => {
    return {
      id: tab,
      renderItem: (
        <RenderBlocks
          {...props}
          metadata={metadata}
          content={tabs[tab]}
          key={`slide-${tab}`}
        />
      ),
    };
  });

  return (
    <>
      <Slider {...settings} ref={slider} className={cx(uiContainer, theme)}>
        {panes.length ? panes.map((pane) => pane.renderItem) : ''}
      </Slider>
    </>
  );
};

View.schemaEnhancer = carouselSchemaEnhancer;

export default View;
