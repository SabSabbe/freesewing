import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// Shared components
import Logo from 'shared/components/logos/freesewing.js'
import PrimaryNavigation from 'shared/components/navigation/primary'
import get from 'lodash.get'
import Right from 'shared/components/icons/right.js'
import Left from 'shared/components/icons/left.js'
// Site components
import Header from 'site/components/header'
import Footer from 'site/components/footer'
import Search from 'site/components/search'

const PageTitle = ({ app, slug, title }) => {
  if (title) return <h1>{title}</h1>
  if (slug) return <h1>{get(app.navigation, slug.split('/')).__title}</h1>

  return <h1>FIXME: This page has no title</h1>
}

const Breadcrumbs = ({ app, slug=false, title }) => {
  if (!slug) return null
  const crumbs = []
  const chunks = slug.split('/')
  for (const i in chunks) {
    const j = parseInt(i)+parseInt(1)
    const page = get(app.navigation, chunks.slice(0,j))
    if (page) crumbs.push([page.__linktitle, '/'+chunks.slice(0,j).join('/'), (j < chunks.length)])
  }

  return (
    <ul className="flex flex-row flex-wrap gap-2 font-bold">
      <li>
        <Link href="/">
          <a title="To the homepage" className="text-base-content">
            <Logo size={24} fill="currentColor" stroke={false}/>
          </a>
        </Link>
      </li>
      {crumbs.map(crumb => (
        <React.Fragment key={crumb[1]}>
          <li className="text-base-content">&raquo;</li>
          <li>
            {crumb[2]
              ?  (
                <Link href={crumb[1]}>
                  <a title={crumb[0]} className="text-secondary hover:text-secondary-focus">
                    {crumb[0]}
                  </a>
                </Link>
              )
              : <span className="text-base-content">{crumb[0]}</span>
            }
          </li>
        </React.Fragment>
      ))}
    </ul>
  )
}

const LayoutWrapper = ({
  app,
  title=false,
  children=[],
  search,
  setSearch,
  noSearch=false,
  workbench=false,
  AltMenu=null,
}) => {
  const startNavigation = () => {
    app.startLoading()
    // Force close of menu on mobile if it is open
    if (app.primaryNavigation) app.setPrimaryNavigation(false)
    // Force close of search modal if it is open
    if (search) setSearch(false)
  }

  const router = useRouter()
  router.events?.on('routeChangeStart', startNavigation)
  router.events?.on('routeChangeComplete', () => app.stopLoading())
  const slug = router.asPath.slice(1)
  const [collapsePrimaryNav, setCollapsePrimaryNav] = useState(workbench || false)
  const [collapseAltMenu, setCollapseAltMenu] = useState(false)

  return (
    <div className={`
    flex flex-col justify-between
    min-h-screen
    bg-base-100
    `}>
      <Header app={app} setSearch={setSearch} />
      <main className="grow">{children}</main>
      {!noSearch && search && (
        <>
        <div className={`
          fixed w-full max-h-screen bg-base-100 top-0 z-30 pt-0 pb-16 px-8
          md:rounded-lg md:top-24
          md:max-w-xl md:m-auto md:inset-x-12
          md:max-w-2xl
          lg:max-w-4xl
        `}>
          <Search app={app} search={search} setSearch={setSearch}/>
        </div>
        <div className="fixed top-0 left-0 w-full min-h-screen bg-neutral z-20 bg-opacity-70"></div>
        </>
      )}
      <Footer app={app} />
    </div>
  )
}

export default LayoutWrapper
