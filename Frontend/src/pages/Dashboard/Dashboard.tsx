import { Flex } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

export const Dashboard = () => {
  return (
    <Flex gap="1em" flex="1">
      <Sider>
        <h2>this is a test for antd - sider</h2>
      </Sider>
      <Content>
        <h2>this is a test for antd - content</h2>
      </Content>
    </Flex>
  );
};
