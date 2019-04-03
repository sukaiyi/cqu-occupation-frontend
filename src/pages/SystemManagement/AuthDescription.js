import React, { PureComponent } from 'react';
import {
  Card,
  Row,
  Col,
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './AuthDescription.less';

const { Description } = DescriptionList;

/* eslint react/no-multi-comp:0 */
class AuthDescription extends PureComponent {


  render() {
    return (
      <PageHeaderWrapper title="访问权限">
        <Row gutter={24}>
          <Col span={8}>
            <Card style={{ marginBottom: 32 }}>
              <DescriptionList size="large" title="超级管理员" col={1}>
                <Description>1. 访问所有页面</Description>
                <Description>2. 增加、删除爬虫及爬虫账号</Description>
                <Description>3. 维护爬虫和爬虫账号的对应关系</Description>
                <Description>4. 新增删除用户，以及用户角色的设置</Description>
              </DescriptionList>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ marginBottom: 32 }}>
              <DescriptionList size="large" title="一般管理员" style={{ marginBottom: 32 }}>
                <Description>123123</Description>
              </DescriptionList>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ marginBottom: 32 }}>
              <DescriptionList size="large" title="普通用户" style={{ marginBottom: 32 }}>
                <Description>123123</Description>
              </DescriptionList>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default AuthDescription;
