import {
    LinkedinFilled,
  TwitterOutlined,
  GithubOutlined
} from "@ant-design/icons";

import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <hr className="footer-line" />
      <div className="footer-row">
        <div className="footer-logo logo">FACFOLIO</div>
        <div className="socials">
          <LinkedinFilled />
          <TwitterOutlined />
          <GithubOutlined />
        </div>
      </div>
        <div className="copy-right">
            <p>&copy; 2023 Facfolio. All Rights Reserved.</p>
            {/* <p>Designed by Gopikrishna</p> */}
        </div>
    </div>
  );
};

export default Footer;
