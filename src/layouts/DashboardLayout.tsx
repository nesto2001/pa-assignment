import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Image, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../assets";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

const { Header, Content, Footer, Sider } = Layout;

type Props = {
  children: React.ReactNode;
};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const DashboardLayout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(pathname);
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth);
    navigate("/");
  };

  const items: MenuItem[] = [
    getItem(
      <Link to={"/actual-data"} className="text-base font-medium">
        Actual Data
      </Link>,
      "/actual-data",
      <PieChartOutlined className="!text-xl" />
    ),
    getItem(
      <Link to={"/forecast-data"} className="text-base font-medium">
        Reservation Forecast
      </Link>,
      "/forecast-data",
      <DesktopOutlined className="!text-xl" />
    ),
    getItem(
      <Link to={"/period-detail"} className="text-base font-medium">
        Period Detail
      </Link>,
      "/period-detail",
      <UserOutlined className="!text-xl" />
    ),
    getItem(
      <div
        className="text-base font-medium text-red-600"
        onClick={handleSignout}
      >
        Sign out
      </div>,
      "sign-out",
      <PoweroffOutlined className="!text-xl !text-red-600" />
    ),
  ];

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        width={300}
        collapsible
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="flex justify-center my-5 mb-10">
          <div className="">
            <Image src={Logo} preview={false} className="w-full" />
          </div>
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={[activeTab]}
          selectedKeys={[activeTab]}
          onClick={(e) => setActiveTab(e.key)}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "32px 24px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
