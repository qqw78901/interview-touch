import React from 'react';
import {
  Container,
  Group,
  Grid,
  Col,
  Icon,
  List,
  Field,
  Button,
  Switch,
  Loader,
  ButtonGroup
} from 'amazeui-touch';
import $ from 'jquery';

const Page1 = React.createClass({
  getInitialState() {
    return {
      loading: true,
      post: {
        elements: []
      }
    };
  },

  componentDidMount() {
    let url = "../form/show.do";
    let self = this;
    let query = self.props.query;
    $.ajax({
      url: url,
      type: "GET",
      data: {
        id: query.fid || ""
      },
      success: function (d) {
        let state = d.data;
        state.loading = false;
        self.setState(state);
      }
    });
  },

  handleChange(e) {
    let thId = e.target.getAttribute('data-thid');
    let text = e.target.value;
    let el = this.state.post;
    el.elements.push({thId, text});
    this.setState({
        post: el
      }
    );
  },
  handleSubmit(e){
    let np = this.state.post;
    np.card = this.refs.thCard.getValue();
    np.name = this.refs.thName.getValue();
    np.phone = this.refs.thPhone.getValue();
    np.interview = this.state.interviewId;
    $.ajax({
      url: "../enter/entry.do",
      type:"POST",
      data:JSON.stringify(np),
      dataType:"JSON",
      contentType: "application/json",
      success: function (d) {
        alert(d.info);
      }
    })
  },

  render() {
    if (this.state.loading) {
      return (
        <Container {...this.props } >
          <Loader amStyle="primary" rounded={true}/>
        </Container>
      )
    } else {
      return (
        <Container {...this.props } >
          <Group noPadded className="margin-v-0"
                 header={this.state.ps}>
            <div className="padding-top-lg"></div>
            <Field containerClassName="padding-h-sm"
                   label="姓名"
                   type="text"
                   ref="thName">
            </Field>
            <Field containerClassName="padding-h-sm"
                   label="学号"
                   type="number"
                   ref="thCard">
            </Field>
            <Field containerClassName="padding-h-sm"
                   label="手机号码"
                   type="number"
                   ref="thPhone">
            </Field>
            {this.state.elements.map((element, i) => {
              console.log(element, i);
              switch (element.type) {
                case "text":
                  return (
                    <Field containerClassName="padding-h-sm"
                           label={element.name}
                           type={element.type}
                           data-thid={element.id}
                           onChange={this.handleChange}>
                    </Field>
                  );
                  break;
                case "radio":
                case "checkbox":
                  return (
                    <List inset className="padding-bottom-lg">
                  <span className="field-label padding-h-sm text-primary">
                    {element.name}</span>
                      {JSON.parse(element.typeText).map((device, i) => {
                        return (
                          <List.Item
                            nested={element.type}
                            key={i}>
                            <Field
                              label={device}
                              type={element.type}
                              name={"form_th" + element.orderby}>
                            </Field>
                          </List.Item>
                        )
                      })}
                    </List>
                  );
                  break;
                default:
                  return (
                    <Field containerClassName="padding-h-sm"
                           label={element.name}
                           type={element.type}
                           data-thid={element.id}>
                    </Field>
                  );
              }

            })}
            <ButtonGroup justify amStyle="primary" className="padding-h-sm">
              <Button onClick={this.handleSubmit}>提交</Button>
            </ButtonGroup>
          </Group>
        </Container>
      );
    }

  }
});

export default Page1;
/*export default class Page1 extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 loading: true,
 post: {
 elements: []
 }
 };
 }

 componentWillMount() {
 let url = "../../form/show.do";
 let self = this;
 $.ajax({
 url: url,
 type: "GET",
 data: {
 id: "a661d512-bb64-4861-bdf8-188707d0474f"
 },
 success: function (d) {
 let state = d.data;
 state.loading = false;
 self.setState(state);
 console.log(2);
 }
 });
 }

 handleChange(e) {
 console.log("handle Change");
 let thid = e.target.getAttribute('data-thid');
 let text = e.target.value;
 console.log(this)
 console.log(React.state);
 let el = React.state.post.elements;
 el.push({thid, text});
 console.log(el);
 this.setState({
 post: {
 elements: [1]
 }
 }
 );
 console.log(React.state);

 }

 render() {
 console.log(this.state);
 if (this.state.loading) {
 console.log(2);
 return (
 <Container {...this.props } >
 <Loader amStyle="primary" rounded={true}/>
 </Container>
 )
 } else {
 console.log(3);
 return (
 <Container {...this.props } >
 <Group noPadded className="margin-v-0"
 header={this.state.ps}>
 <div className="padding-top-lg"></div>
 {this.state.elements.map((element, i) => {
 console.log(element, i);
 switch (element.type) {
 case "text":
 return (
 <Field containerClassName="padding-h-sm"
 label={element.name}
 type={element.type}
 data-thid={element.id}
 onChange={this.handleChange}>
 </Field>
 );
 break;
 case "radio":
 case "checkbox":
 return (
 <List inset className="padding-bottom-lg">
 <span className="field-label padding-h-sm text-primary">
 {element.name}</span>
 {JSON.parse(element.typeText).map((device, i) => {
 return (
 <List.Item
 nested={element.type}
 key={i}>
 <Field
 label={device}
 type={element.type}
 name={"form_th" + element.orderby}>
 </Field>
 </List.Item>
 )
 })}
 </List>
 );
 break;
 default:
 return (
 <Field containerClassName="padding-h-sm"
 label={element.name}
 type={element.type}
 data-thid={element.id}>
 </Field>
 );
 }

 })}
 <ButtonGroup justify amStyle="primary" className="padding-h-sm">
 <Button>提交</Button>
 </ButtonGroup>
 </Group>
 </Container>
 );
 }

 }
 }*/
