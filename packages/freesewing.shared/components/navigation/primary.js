import Link from 'next/link'
import orderBy from 'lodash.orderby'
import RssIcon from 'shared/components/icons/rss.js'
import TutorialIcon from 'shared/components/icons/tutorial.js'
import GuideIcon from 'shared/components/icons/guide.js'
import HelpIcon from 'shared/components/icons/help.js'
import DocsIcon from 'shared/components/icons/docs.js'
import DesignIcon from 'shared/components/icons/design.js'
import BoxIcon from 'shared/components/icons/box.js'
import CogIcon from 'shared/components/icons/cog.js'
import UserIcon from 'shared/components/icons/user.js'
import CommunityIcon from 'shared/components/icons/community.js'
import ShowcaseIcon from 'shared/components/icons/camera.js'

// Don't show children for blog and showcase posts
const keepClosed = ['blog', 'showcase', ]

// TODO: For now we force tailwind to pickup these styles
// At some point this should 'just work' though, but let's not worry about it now
const force = [
  <p className="w-6 mr-2"/>,
  <p className="w-8 mr-3"/>
]

// List of icons matched to top-level slug
const icons = {
  accessories: (className='') => <TutorialIcon className={className}/>,
  account: (className='') => <UserIcon className={className}/>,
  blocks: (className='') => <BoxIcon className={className}/>,
  blog: (className='') => <RssIcon className={className}/>,
  community: (className='') => <CommunityIcon className={className}/>,
  designs: (className='') => <DesignIcon className={className}/>,
  docs: (className='') => <DocsIcon className={className}/>,
  garments: (className='') => <DesignIcon className={className}/>,
  guides: (className='') => <GuideIcon className={className}/>,
  howtos: (className='') => <HelpIcon className={className}/>,
  reference: (className='') => <DocsIcon className={className}/>,
  showcase: (className='') => <ShowcaseIcon className={className}/>,
  tutorials: (className='') => <TutorialIcon className={className}/>,
  utilities: (className='') => <CogIcon className={className}/>,
}

/* helper method to order nav entries */
const order = obj => orderBy(obj, ['__order', '__title'], ['asc', 'asc'])

// Component for the collapse toggle
// Exported for re-use
export const Chevron = ({w=8, m=2}) => <svg className={`
    fill-current opacity-75 w-${w} h-${w} mr-${m}
    details-toggle hover:text-secondary sm:hover:text-secondary
  `}
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/>
</svg>

// Helper method to filter out the real children
const currentChildren = current => Object.values(order(current))
  .filter(entry => (typeof entry === 'object'))

// Shared classes for links
// Exported for re-use
export const linkClasses = `text-lg lg:text-xl
  py-1
  text-base-content sm:text-base-content
  hover:text-secondary
  sm:hover:text-secondary
`

// Figure out whether a page is on the path to the active page
const isActive = (slug, active) => {
  if (slug === active) return true
  let result = true
  const slugParts = slug.split('/')
  const activeParts = active.split('/')
  for (const i in slugParts) {
    if (slugParts[i] !== activeParts[i]) result = false
  }

  return result
}

// Component that renders a sublevel of navigation
const SubLevel = ({ nodes={}, active }) => (
  <ul className="pl-5 list-inside">
    {currentChildren(nodes).map(child => (Object.keys(child).length > 4)
      ? (
        <li key={child.__slug} className="flex flex-row">
          <details className="grow" open={isActive(child.__slug, active)}>
            <summary className={`
              flex flex-row
              px-2
              text-base-content
              sm:text-base-content
              hover:cursor-row-resize
              items-center
            `}>
              <Link href={`${child.__slug}`}>
                <a title={child.__title} className={`
                  grow pl-2 border-l-2
                  ${linkClasses}
                  hover:cursor-pointer
                  hover:border-secondary
                  sm:hover:border-secondary
                  ${child.__slug === active
                    ? 'text-secondary border-secondary sm:text-secondary sm:border-secondary'
                    : 'text-base-content sm:text-base-content'
                  }
                `}>
                  <span className={`
                    text-3xl mr-2 inline-block p-0 leading-3
                    ${child.__slug === active
                      ? 'text-secondary sm:text-secondary translate-y-1'
                      : 'translate-y-3'
                    }
                  `}>
                    {child.__slug === active ? <>&bull;</> : <>&deg;</>}
                  </span>
                  <span className={child.__slug === active ? 'font-bold' : ''}>
                    { child.__linktitle || child.__title }
                  </span>
                </a>
              </Link>
              <Chevron w={6} m={3}/>
            </summary>
            <SubLevel nodes={child} active={active} />
          </details>
        </li>
      ) : (
        <li className='pl-2 flex flex-row items-center' key={child.__slug}>
          <Link href={`${child.__slug}`} title={child.__title}>
            <a className={`
              pl-2 border-l-2
              grow
              ${linkClasses}
              hover:cursor-pointer
              hover:border-secondary
              sm:hover:border-secondary
              ${child.__slug === active
                ? 'text-secondary border-secondary sm:text-secondary sm:border-secondary'
                : 'text-base-content sm:text-base-content'
              }`}>
              <span className={`
                text-3xl mr-2 inline-block p-0 leading-3
                ${child.__slug === active
                  ? 'text-secondary sm:text-secondary translate-y-1'
                  : 'translate-y-3'
                }
              `}>
               {child.__slug === active ? <>&bull;</> : <>&deg;</>}
              </span>
              <span className={child.__slug === active ? 'font-bold' : ''}>
                {child.__linktitle}
              </span>
            </a>
          </Link>
        </li>
      )

    )}
  </ul>
)

// Component that renders a toplevel of navigation
const TopLevel = ({ icon, title, nav, current, slug, hasChildren=false, active }) => (
  <details className='py-1' open={((keepClosed.indexOf(current.__slug) === -1) ? 1 : 0)}>
    <summary className={`
      flex flex-row uppercase gap-4 font-bold text-lg
      hover:cursor-row-resize
      p-2
      text-base-content
      sm:text-base-content
      items-center
    `}>
      <span className="text-secondary">{icon}</span>
      <Link href={`${slug}`}>
        <a className={`
          grow ${linkClasses} hover:cursor-pointer
          ${slug === active
            ? 'text-secondary sm:text-secondary'
            : ''
          }`}
        >
          {title}
        </a>
      </Link>
    {hasChildren && <Chevron />}
    </summary>
    {hasChildren && <SubLevel nodes={current} active={active} />}
  </details>
)

const Navigation = ({ app, active, className='' }) => {
  if (!app.navigation) return null
  const output = []
  for (const page of order(app.navigation)) output.push(<TopLevel
    key={page.__slug}
    icon={icons[page.__slug]
      ? icons[page.__slug]('w-6 h-6')
      : <span className="text-3xl mr-2 translate-y-3 inline-block p-0 leading-3">&deg;</span>
    }
    title={page.__title}
    slug={page.__slug}
    hasChildren={keepClosed.indexOf(page.__slug) === -1}
    nav={app.navigation}
    current={order(app.navigation[page.__slug])}
    active={active}
  />)

  return <div className={`pb-20 ${className}`}>{output}</div>
}

export const Icons = ({
  app, active,
  ulClasses='',
  liClasses='',
  linkClasses=`grow text-lg lg:text-xl py-1 text-base-content sm:text-base-content
  hover:text-secondary sm:hover:text-secondary hover:cursor-pointer
  flex flex-col items-center`,
  linkStyle={}
}) => {
  if (!app.navigation) return null
  const output = []
  for (const page of order(app.navigation)) {
    output.push(
      <li key={page.__slug} className={liClasses}>
        <Link href={`${page.__slug}`}>
          <a className={linkClasses} title={page.__title} style={linkStyle}>
            {icons[page.__slug]
              ? icons[page.__slug]('w-14 h-14')
              : <HelpIcon />
            }
            <span className='font-bold'>{page.__title}</span>
          </a>
        </Link>
      </li>
    )
  }

  return <ul className={ulClasses}>{output}</ul>
}

const PrimaryMenu = ({ app, active, before=[], after=[] }) => (
  <nav className="mb-12">
    {before}
    <Icons app={app} ulClasses="hidden md:block lg:hidden flex flex-col items-center"/>
    <Navigation app={app} active={active} className="md:hidden lg:block"/>
    {after}
  </nav>
)

export default PrimaryMenu
