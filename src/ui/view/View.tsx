import * as React from 'react'

export interface ViewMapEntry {

}

export interface ViewMap {
  [key: string]: ViewMapEntry
}

export interface ViewProps {
  viewMap
}

const View  = () => <div> </div>

export default View
