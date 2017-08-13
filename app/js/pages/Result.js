import React from 'react';
import {
  Container,
  List,
  NavBar,
  Group,
  View,
  Card,
  Loader,
  Badge,

} from 'amazeui-touch';
import {
  Link,
} from 'react-router';
import $ from 'jquery';
import "../../style/index.scss";
const badge1 = function (d) {
  return (
    <Badge amStyle="secondary" rounded>{d}</Badge>
  )
};
const FormItems = React.createClass({
  getInitialState(){
    return {
      loading: true,
      formList: {}
    }
  },

  componentDidMount(){
    let forms = {};
    let self = this;
    $.ajax({
      url: "../form/getPublicFormByPage.do",
      type: "GET",
      data:{
        order:"asc",
        offset:0,
        limit:1000,
      },
      success: function (d) {
        if (!d.success) return;
        let rows = d.rows;
        //遍历报名表 转换成社团名为key 报名表组成数组的value
        rows.map((row, index) => {
          if (typeof forms[row.deptName] === "undefined") {
            forms[row.deptName] = [];
          }
          forms[row.deptName].push(row);
        });
        self.setState({
          formList: forms,
          loading: false,
          total: d.total
        });

      }
    });
  },

  makeFormList(formList){
    let a = [];
    for (let index in formList) {
      let item = formList[index];
      a.push(
        <Card>
          <List>
            <List.Item role="header" className="padding-v-xs text-primary">
              {index}
              {badge1(item.length)}
            </List.Item>
            {
              item.map((value, key) => {
                console.log("item.map");
                console.log(value, key);
                return (
                  <List.Item
                    linkComponent={Link}

                    // 传递 query 参数
                    linkProps={{
                      to: {
                        pathname: "/search",
                        query: {fid: value.id}
                      }
                    }}
                    title={value.title}
                    key={key}
                  />
                )
              })
            }
          </List>
        </Card>
      );
    }
    return a;

  },
  render(){
    if (this.state.loading) {
      return (
        <Container {...this.props } >
          <Loader amStyle="primary" rounded={true}/>
        </Container>)
    } else {
      let formList = this.state.formList;
      return (
        <div className="padding-top-sm">
          {this.makeFormList(formList)}
        </div>)


    }
  }
});

export default class Result extends React.Component {
  static defaultProps = {
    transition: 'rfr'
  };

  render() {
    return (
      <View>
        <NavBar
          amStyle="primary"
          title="招新报名平台移动版"
        />
        <Container scrollable>
          <Group
            header="以下社团正火热接受报名"
            className="margin-top-0 index-group"
            noPadded
          >
            <FormItems/>
          </Group>
        </Container>
      </View>
    );
  }
}
