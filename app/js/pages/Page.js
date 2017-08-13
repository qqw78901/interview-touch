import React from 'react';
import {
  View,
  NavBar,
} from 'amazeui-touch';
import {
  Link,
} from 'react-router';

import Page1 from './Page1';
import Page2 from './Page2';
import Result from './Result';
import Search from './Search';
import NotFound from './NotFound';

const pages = {
  Page1,
  Page2,
  Result,
  Search
};

class Page extends React.Component {
  render() {
    let page = this.props.params.page;
    // 使用 query
    let query =  this.props.location.query;
    console.log(this.props.location.query);

    if (page) {
      page = page.charAt(0).toUpperCase() + page.slice(1);
    }
    console.log(page);

    const Component = pages[page] || NotFound;
    let back = page=="Page1"?"/":page=="Page2"?'/':"/result";
    console.log(back);
    const backNav = {
      component: Link,
      icon: 'left-nav',
      title: '返回',
      to: back,
      onlyActiveOnIndex: true,
    };
//query={query} :往组件添加路由变量
    return (
      <View>
        <NavBar
          title={page}
          leftNav={[backNav]}
          amStyle="primary"
        />
        <Component scrollable query={query}/>
      </View>
    );
  }
}

export default Page;
