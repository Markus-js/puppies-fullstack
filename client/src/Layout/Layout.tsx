import Navigation from './Navigation/Navigation'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}

export default Layout