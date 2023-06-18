import { LinkContainer } from "react-router-bootstrap";
import { Badge, NavDropdown, Container, Navbar, Nav } from "react-bootstrap";
import { FaUserAlt, FaHeart } from "react-icons/fa";
import { useAppSelector } from "../hooks/useApp";
import { useUserActions } from "../hooks/useUserActions";

const headerTexts = {
  feed: "feed",
  contact: "contact",
  logOutButton: "Logout",
};

export function Header() {
  const user = useAppSelector((state) => state.account.user);
  const whishList = useAppSelector((state) => state.whishList.products);

  const { logOutUser } = useUserActions();

  function handleClick() {
    logOutUser();
  }

  return (
    <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
      <Container>
        <LinkContainer to='/feed'>
          <Navbar.Brand>
            <img
              className='logo'
              src='/fake-store-logo.png'
              alt='ecommerce logo'
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {user.name && (
              <>
                <LinkContainer to='/feed'>
                  <Nav.Link className='text-capitalize'>
                    {headerTexts.feed}
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/contact'>
                  <Nav.Link className='text-capitalize'>
                    {headerTexts.contact}
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          <Nav>
            {user.name && (
              <>
                <LinkContainer to='/whish-list'>
                  <Nav.Link>
                    <Badge bg='danger' className='p-2'>
                      <FaHeart />
                      <span className='ps-1'>{whishList.length}</span>
                    </Badge>
                  </Nav.Link>
                </LinkContainer>

                <NavDropdown title={<FaUserAlt />} id='nav-dropdown'>
                  <NavDropdown.Item onClick={handleClick}>
                    {headerTexts.logOutButton}
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
