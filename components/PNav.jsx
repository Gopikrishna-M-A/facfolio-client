"use client";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const PNav = ({ slug }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    const url = pathname;
    const parts = url.split("/");
    const page = parts[parts.length - 1];
    setActiveLink(page);
  }, [pathname]);
  return (
    <div className="nav">
      <div className="logo">FACFOLIO</div>
      <div className="nav-links-wrapper">
        <Link
          href={`/portfolio/${slug}/home`}
          className={`nav-link ${activeLink === "home" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          href={`/portfolio/${slug}/about`}
          className={`nav-link ${activeLink === "about" ? "active" : ""}`}
        >
          About
        </Link>
        <Link
          href={`/portfolio/${slug}/research`}
          className={`nav-link ${activeLink === "research" ? "active" : ""}`}
        >
          Research
        </Link>
        <Link
          href={`/portfolio/${slug}/projects`}
          className={`nav-link ${activeLink === "projects" ? "active" : ""}`}
        >
          Projects
        </Link>
        <Link
          href={`/portfolio/${slug}/blogs`}
          className={`nav-link ${activeLink === "blogs" ? "active" : ""}`}
        >
          Blogs
        </Link>
      </div>
      <Link href={`/portfolio/${slug}/contact`}>
        <Button type="primary" className="contact-btn">
          LET'S TALK
        </Button>
      </Link>

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
        <Link onClick={closeDrawer} href={`/portfolio/${slug}/home`}>
          <Button
            block
            type="default"
            className={`nav-link ${activeLink === "home" ? "active" : ""}`}
          >
            Home
          </Button>
        </Link>
        <Link onClick={closeDrawer} href={`/portfolio/${slug}/about`}>
          <Button
            block
            type="default"
            className={`nav-link ${activeLink === "about" ? "active" : ""}`}
          >
            About
          </Button>
        </Link>
        <Link onClick={closeDrawer} href={`/portfolio/${slug}/research`}>
          <Button
            block
            type="default"
            className={`nav-link ${activeLink === "research" ? "active" : ""}`}
          >
            Research
          </Button>
        </Link>
        <Link onClick={closeDrawer} href={`/portfolio/${slug}/projects`}>
          <Button
            block
            type="default"
            className={`nav-link ${activeLink === "projects" ? "active" : ""}`}
          >
            Projects
          </Button>
        </Link>
        <Link onClick={closeDrawer} href={`/portfolio/${slug}/blogs`}>
          <Button
            block
            type="default"
            className={`nav-link ${activeLink === "blogs" ? "active" : ""}`}
          >
            Blogs
          </Button>
        </Link>
        <Link onClick={closeDrawer} href={`/portfolio/${slug}/contact`}>
          <Button type="primary" className="menu-contact-btn" block>
            LET'S TALK
          </Button>
        </Link>
      </Drawer>
    </div>
  );
};

export default PNav;
