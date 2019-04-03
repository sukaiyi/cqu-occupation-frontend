import React, { PureComponent } from 'react';
import { Card, Row, Col } from 'antd';
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
                <Description>4. 在数据管理页面，能够编辑所采集到用户的信息</Description>
                <Description>5. 能够查看用户的职业征信报告</Description>
                <Description>6. 新增删除用户，以及用户角色的设置</Description>
              </DescriptionList>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ marginBottom: 32 }}>
              <DescriptionList size="large" title="一般管理员" col={1}>
                <Description>1. 只允许访问大部分页面</Description>
                <Description>2. 对访问的页面不能增删改，只能查看</Description>
                <Description>3. 能够查看用户的职业征信报告</Description>
                <Description>4. 不能访问系统管理页面</Description>
              </DescriptionList>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ marginBottom: 32 }}>
              <DescriptionList size="large" title="普通用户" col={1}>
                <Description>1. 只允许访问部分页面</Description>
                <Description>2. 对访问的页面不能进行增删改，只能查看</Description>
                <Description>3. 不能查看用户的职业征信报告</Description>
                <Description>4. 不能访问系统管理页面</Description>
              </DescriptionList>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default AuthDescription;
