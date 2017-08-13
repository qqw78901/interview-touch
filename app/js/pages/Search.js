import React from 'react';
import {
  Container,
  List,
  NavBar,
  Group,
  View,
  Field,
  Card,
  Loader,
  Badge,
  Icon,
  Button,
  ButtonGroup
} from 'amazeui-touch';
import {
  Link,
} from 'react-router';
import $ from 'jquery';
let fields = [
  {
    label: '姓名',
    type: 'text',
    icon: 'person',
    id: 'name'
  },
  {
    label: '学号',
    type: 'number',
    icon: 'info',
    id: 'card'
  }
];
const badge1 = function (d) {
  let text = d == "H" ? "未决定" : d == "T" ? "通过" : "未通过";
  let sty = d == "H" ? "secondary" : d == "T" ? "success" : "alert";
  return (
    <Badge amStyle={sty} rounded className="text-center">{text}</Badge>
  )
};
const Head = React.createClass({
  getInitialState() {
    return {
      loading: true,
    };
  },
  handleSearch(e){
    console.log(111111);
    let self = this;
    let query = this.props.query;
    let card = this.refs.card.getValue();
    let name = this.refs.name.getValue();
    console.log(query);
    $.ajax({
      url: "../result/know.do",
      data: {
        order: "asc",
        offset: 0,
        limit: 1000,
        form: query.fid,
        card: card, name: name
      },
      success: function (r) {
        self.setState(r);
        self.setState({loading: false});

      }
    })
  },

  render(){
    return (
      <div>
        <Group
          header="提供您的学号和姓名进行查询"
          noPadded
        >
          <List>
            {fields.map((field, i) => {
              return (
                <List.Item
                  key={i}
                  media={<Icon name={field.icon}/>}
                  nested="input"
                >
                  <Field
                    {...field}
                    label={null}
                    ref={field.id}
                    placeholder={field.label + '...'}
                  />
                </List.Item>
              );
            })}
          </List>
          <ButtonGroup justify amStyle="primary" className="padding-h-sm">
            <Button onClick={this.handleSearch}>查询</Button>
          </ButtonGroup>
        </Group>
            {
              this.state.loading ?
                <div></div> : this.state.rows.length == 0 ?
                  <div>查无数据</div> :
                  this.state.rows.map((row, i) => {
                    return (
                      <Card
                        header={"姓名:" + row.name}
                        footer={
                          badge1(row.result)
                        }
                      >
                        <p>姓名:{row.name}</p>
                        <p>学号:{row.card}</p>
                        <p>手机号:{row.phone}</p>
                        <p>面试:{row.title}</p>
                      </Card>

                    )
                  })

            }
      </div>
    )
  }
});

export default class Search extends React.Component {
  render() {

    return (
      <Container {...this.props}>
        <Head {...this.props}/>
      </Container>
    )
  }
}
