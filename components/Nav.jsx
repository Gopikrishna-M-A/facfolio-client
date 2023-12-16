"use client";
import { Button, Drawer, Avatar, Badge } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = ({ user }) => {
  const [drawerVisible, setDrawerVisible] = useState(false); // State to manage drawer visibility
  //   const [slug, setSlug] = useState(''); // State to manage slug

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  //   useEffect(() => {
  //     const url = window.location.pathname;
  //     const parts = url.split("/");
  //     const slug = parts[parts.length - 2];
  //     setSlug(slug);
  //   }, []);

  return (
    <div className="nav">
      <div className="logo">FACFOLIO</div>
      <div className="nav-links-wrapper">
        {/* <Link href={`/portfolio/${slug}/home`} className="nav-link">Home</Link>
            <Link href={`/portfolio/${slug}/about`} className="nav-link">About</Link>
            <Link href={`/portfolio/${slug}/research`} className="nav-link">Research</Link>
            <Link href={`/portfolio/${slug}/projects`} className="nav-link">Projects</Link>
            <Link href={`/portfolio/${slug}/blogs`} className="nav-link">Blogs</Link> */}
      </div>
      {user ? (
        <div>
          <Link href={`/api/auth/signout`}
            style={{
                marginRight: "10px",
            }}
          >
            <Button className="contact-btn">
              Logout
            </Button>
          </Link>{" "}
          <Avatar src={user.image} />
        </div>
      ) : (
        <Link href={`/api/auth/signin`}>
          <Button type="primary" className="contact-btn">
            Login
          </Button>
        </Link>
      )}

      <div className="menu-icon" onClick={() => setDrawerVisible(true)}>
        <MenuOutlined />
      </div>

      {/* Drawer for the responsive menu */}
      <Drawer
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        closable={true} // Disable the close button
        className="menu-drawer"
      >
        {/* <Link onClick={closeDrawer} href={'/'}><Button block type='default'  className="menu-link">Home</Button></Link>
            <Link onClick={closeDrawer} href={'/about'}><Button block type='default'  className="menu-link">About</Button></Link>
            <Link onClick={closeDrawer} href={'/research'}><Button block type='default'  className="menu-link">Research</Button></Link>
            <Link onClick={closeDrawer} href={'/projects'}><Button block type='default'  className="menu-link">Projects</Button></Link>
            <Link onClick={closeDrawer} href={'/blogs'}><Button block type='default'  className="menu-link">Blogs</Button></Link> */}
        <Link onClick={closeDrawer} href={"/api/auth/signin"}>
          <Button type="primary" className="menu-contact-btn" block>
            Login
          </Button>
        </Link>
      </Drawer>
    </div>
  );
};

export default Navbar;
