import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  Radio,
  Row,
  Col,
  Collapse,
  Tag,
  Divider, Icon, Modal, Spin
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserInfoEdit.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const xingzuo = ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'];

const CreateForm = Form.create()(props => {
  const { modalState, form, handleAdd, handleModalState } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({ ...fieldsValue, modalState });
    });
  };
  return (
    <Modal
      destroyOnClose
      title="添加标签"
      visible={!!modalState}
      onOk={okHandle}
      onCancel={() => handleModalState()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标签">
        {form.getFieldDecorator('tag', {
          rules: [{ required: true, message: '请输入要添加的标签！' }],
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ userInfo, loading }) => ({
  submitting: loading.effects['userInfo/update'],
  refreshing: loading.effects['userInfo/fetchDetail'],
  userInfo,
}))
@Form.create()
class UserInfoFrom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalState: null,
      userInfoDetail: {}
    };
  }

  componentDidMount() {
    const { dispatch, match, form } = this.props;
    const { params } = match;

    dispatch({
      payload: params.id,
      type: 'userInfo/fetchDetail',
      callback: (response) => {
        if (response.code === 0) {
          form.setFieldsValue({ ...response.obj });
          this.setState({
            userInfoDetail: response.obj,
          })
        }
      },
    });
  }

  handleSubmit = () => {
    const { dispatch, form } = this.props;
    const { userInfoDetail } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'userInfo/update',
          payload: {...userInfoDetail, ...values},
        });
      }
    });
  };

  handleAddTag = values => {
    const { tag, modalState } = values;
    const { userInfoDetail, userInfoDetail: { impTags, impTagList, proTags, proTagList } } = this.state;
    const newImpTags = `${impTags};${tag}`;
    const newImpTagList = [...impTagList, tag];
    const newProTags = modalState === 'proTags' ? `${proTags};${tag} 1` : proTags;
    const newProTagList = modalState === 'proTags' ? [...proTagList, tag] : proTagList;
    this.setState({
      userInfoDetail: {
        ...userInfoDetail,
        impTags: newImpTags,
        impTagList: newImpTagList,
        proTags: newProTags,
        proTagList: newProTagList,
      },
    });
    this.handleModalState(null);
  };

  handleModalState = flag => {
    this.setState({
      modalState: flag,
    });
  };

  onTagClose = (witch, tag) => {
    const { userInfoDetail, userInfoDetail: { impTags, impTagList, proTags, proTagList } } = this.state;
    const newProTags = proTags.split(';').filter(e => e.split(' ')[0] !== tag).join(';');
    const newProTagList = proTagList.filter(e => e !== tag);
    const newImpTags = witch === 'impTags' ? impTags.split(';').filter(e => e !== tag).join(';') : impTags;
    const newImpTagList = witch === 'impTags' ? impTagList.filter(e => e !== tag) : impTagList;
    this.setState({
      userInfoDetail: {
        ...userInfoDetail,
        impTags: newImpTags,
        impTagList: newImpTagList,
        proTags: newProTags,
        proTagList: newProTagList,
      },
    });
  };

  render() {
    const { submitting, refreshing } = this.props;
    const { form: { getFieldDecorator } } = this.props;
    const { modalState, userInfoDetail: { impTagList = [], proTagList = [] } } = this.state;
    console.log(impTagList, proTagList);
    const parentMethods = {
      handleAdd: this.handleAddTag,
      handleModalState: this.handleModalState,
    };

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };

    return (
      <PageHeaderWrapper
        title="详情编辑"
        content={
          <Button type="primary" loading={submitting} onClick={this.handleSubmit}>
            保存
          </Button>
        }
        loading={refreshing}
      >
        <Spin spinning={submitting || refreshing}>
          <Collapse defaultActiveKey={['baseInfo']}>
            <Collapse.Panel header="基础信息" key="baseInfo">
              <Form layout="horizontal" onSubmit={this.handleSubmit} style={{ marginTop: 8, flex: 1 }}>
                <Row gutter={24}>
                  <Col span={8} style={{ display: 'block' }}>
                    <FormItem {...formItemLayout} label="姓名">
                      {getFieldDecorator('name')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="真实姓名">
                      {getFieldDecorator('realname')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="家乡">
                      {getFieldDecorator('htProvince')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="家乡城市">
                      {getFieldDecorator('htCity')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="性别">
                      {getFieldDecorator('gender', {
                        initialValue: '1',
                      })(
                        <Radio.Group>
                          <Radio value="1">男</Radio>
                          <Radio value="2">女</Radio>
                        </Radio.Group>,
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="星座">
                      {getFieldDecorator('xingzuo')(
                        <Select placeholder="选择星座">
                          {xingzuo.map(x => <Option value={x}>{x}</Option>)}
                        </Select>,
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="在职公司">
                      {getFieldDecorator('company')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="公司编号">
                      {getFieldDecorator('cmpId')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="公司连接">
                      {getFieldDecorator('cmpUrl')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="是否公司老总">
                      {getFieldDecorator('isCmpOwner', {
                        initialValue: '0',
                      })(
                        <Radio.Group>
                          <Radio value="0">否</Radio>
                          <Radio value="1">是</Radio>
                        </Radio.Group>,
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="领域 1">
                      {getFieldDecorator('field')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="领域 2">
                      {getFieldDecorator('field2')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="职业">
                      {getFieldDecorator('profession')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="职位">
                      {getFieldDecorator('position')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="省份">
                      {getFieldDecorator('province')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="城市">
                      {getFieldDecorator('city')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="地址">
                      {getFieldDecorator('address')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="一句话介绍自己">
                      {getFieldDecorator('oneSentence')(<TextArea rows={3}/>)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="主页展示的介绍语言">
                      {getFieldDecorator('headline')(<TextArea rows={3}/>)}
                    </FormItem>
                  </Col>

                  <Col span={8}>
                    <FormItem {...formItemLayout} label="互动数">
                      {getFieldDecorator('interactions')(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="动态数">
                      {getFieldDecorator('dongtai')(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="观点数">
                      {getFieldDecorator('guandian')(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="专栏数">
                      {getFieldDecorator('zhuanlan')(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="点评数">
                      {getFieldDecorator('dianping')(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="被点赞次数">
                      {getFieldDecorator('likes')(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="被访问次数">
                      {getFieldDecorator('views')(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="最后收到的Feed数">
                      {getFieldDecorator('recentFeeds')(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="影响力">
                      {getFieldDecorator('influence')(<InputNumber/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="影响力超过">
                      {getFieldDecorator('infDefeat')(
                        <InputNumber
                          formatter={value => `${value}%`}
                          parser={value => value.replace('%', '')}
                          disabled
                        />,
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="资料完善度">
                      {getFieldDecorator('infoRatio')(<Input/>)}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem {...formItemLayout} label="更新时间">
                      {getFieldDecorator('uptime')(<Input/>)}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Collapse.Panel>

            <Collapse.Panel header="个人标签" key="tags">
              <div className={styles.title}>印象标签</div>
              <div className={styles.tags}>
                {impTagList.map(tag => {
                  return <Tag visible closable onClose={() => this.onTagClose("impTags", tag)}>{tag}</Tag>;
                })}
                <Tag
                  onClick={() => this.handleModalState('impTags')}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus"/>
                </Tag>
              </div>
              <Divider style={{ marginBottom: 32 }}/>
              <div className={styles.title}>职业标签</div>
              <div className={styles.tags}>
                {proTagList.map(tag => {
                  return <Tag visible closable onClose={() => this.onTagClose("proTags", tag)}>{tag}</Tag>;
                })}
                <Tag
                  onClick={() => this.handleModalState('proTags')}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus"/>
                </Tag>
              </div>
            </Collapse.Panel>
          </Collapse>
        </Spin>
        <CreateForm {...parentMethods} modalState={modalState} />
      </PageHeaderWrapper>
    );
  }
}

export default UserInfoFrom;
