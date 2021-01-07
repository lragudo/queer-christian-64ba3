import React from "react";
import _ from "lodash";

import { classNames, Link, withPrefix, toStyleObj } from "../utils";
import Picture from "./Picture";

export default class Header extends React.Component {
  render() {
    let page = _.get(this.props, "page", null);
    let site = _.get(this.props, "site", null);
    let white_header = _.get(page, "frontmatter.white_header", null) || false;
    return (
      <header className="header">
        <nav
          className={classNames("nav", {
            "nav--light": white_header,
            "nav--dark": white_header !== true
          })}
        >
          <div
            className="nav__logo"
            data-dark={_.get(site, "siteMetadata.logo_dark", null)}
          >
            <Link to={withPrefix("/")}>
              {white_header ||
              _.get(page, "frontmatter.template", null) === "product" ? (
                <Picture
                  {...this.props}
                  image={_.get(site, "siteMetadata.logo_light", null)}
                  cssClass={"nav__logo-image"}
                  alt={"Site logo"}
                />
              ) : (
                <Picture
                  {...this.props}
                  image={_.get(site, "siteMetadata.logo_dark", null)}
                  cssClass={"nav__logo-image"}
                  alt={"Site logo"}
                />
              )}
            </Link>
          </div>
          <ul className="nav__menu">
            {_.map(
              _.get(site, "siteMetadata.main_menu", null),
              (item, item_idx) => {
                let section =
                  _.get(page, "frontmatter.section", null) ||
                  _.get(page, "frontmatter.title", null);
                let isActive =
                  _.get(item, "title", null) === section ? true : false;
                return (
                  <React.Fragment key={item_idx + ".1"}>
                    <li key={item_idx} className="nav__menu-item">
                      <Link
                        to={withPrefix(_.get(item, "url", null))}
                        className={classNames("nav__menu-item-link", {
                          "nav__menu-item-link--active": isActive
                        })}
                      >
                        {_.get(item, "title", null)}
                      </Link>
                    </li>
                  </React.Fragment>
                );
              }
            )}
          </ul>
        </nav>
      </header>
    );
  }
}
