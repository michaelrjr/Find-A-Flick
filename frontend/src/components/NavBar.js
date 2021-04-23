import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Context";

export default function NavBar() {
  const { signOut } = useAuth();
  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" bg="light" fixed="top">
      <Navbar.Brand className="mr-4">
        <Link className="link" to="/">
          Find-A-Flick
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <div className="mr-3">
            <Link className="link" to="/">
              Discover
            </Link>
          </div>
          <div className="mr-3">
            <Link className="link" to="/trending">
              Trending
            </Link>
          </div>
          <div className="mr-3">
            <Link className="link" to="/popular">
              Popular
            </Link>
          </div>
          <div className="mr-3">
            <Link className="link" to="/top-rated">
              Top Rated
            </Link>
          </div>
          <div className="mr-3">
            <Link className="link" to="/up-coming">
              Upcoming
            </Link>
          </div>
          <div className="mr-3">
            <Link className="link" to="/watch-list">
              Watch List
            </Link>
          </div>
          <div>
            <Link className="link" to="/profile">
              Profile
            </Link>
          </div>
        </Nav>
        <div>
          <Link to="/sign-up">
            <button className="btn btn-outline-success btn-sm mr-2">Sign up</button>
          </Link>
          <Link to="/sign-in">
            <button className="btn btn-outline-primary btn-sm mr-2">Sign in</button>
          </Link>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={async () => {
              try {
                await signOut();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Sign out
          </button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
