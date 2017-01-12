import css from './Group.css'

export default function Group({className, name, children}){
  return <div className={`${className} ${css.group}`}>
    <div className={css.groupHeader}>{name}</div>

    <div className={css.groupBody}>{children}</div>
  </div>
}
