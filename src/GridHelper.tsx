import React, { useEffect, useRef } from "react"
import { Color3, Mesh, Nullable } from "@babylonjs/core"
import { GridMaterial } from "@babylonjs/materials"
import { useScene } from "react-babylonjs"

export type GridHelperProps = {
  width: number
  height: number
  subdivisions: number
  majorUnitFrequency: number
  minorUnitVisibility: number
  gridRatio: number
  mainColor: Color3
  lineColor: Color3
  opacity: number
}

export const defaultGridHelperProps: GridHelperProps = {
  width: 100,
  height: 100,
  subdivisions: 100,
  majorUnitFrequency: 5,
  minorUnitVisibility: 0.5,
  gridRatio: 0.5,
  mainColor: new Color3(0, 0.05, 0.2),
  lineColor: new Color3(0, 1.0, 1.0),
  opacity: 0.98,
}

const GridHelper0: React.VFC<GridHelperProps> = (props) => {
  const scene = useScene()
  const gridHelperRef = useRef<Nullable<Mesh>>(null)

  useEffect(() => {
    if (!scene || !gridHelperRef.current) {
      return
    }

    const gridMaterial = new GridMaterial("grid", scene)
    gridMaterial.majorUnitFrequency = props.majorUnitFrequency
    gridMaterial.minorUnitVisibility = props.minorUnitVisibility
    gridMaterial.gridRatio = props.gridRatio
    gridMaterial.mainColor = props.mainColor
    gridMaterial.lineColor = props.lineColor
    gridMaterial.backFaceCulling = false
    gridMaterial.opacity = props.opacity

    const mesh = gridHelperRef.current
    mesh.material = gridMaterial
  }, [
    props.gridRatio,
    props.lineColor,
    props.mainColor,
    props.majorUnitFrequency,
    props.minorUnitVisibility,
    props.opacity,
    scene,
  ])

  return (
    <ground
      name="grid-helper"
      width={props.width}
      height={props.height}
      subdivisions={props.subdivisions}
      updatable={false}
      ref={gridHelperRef}
    />
  )
}

export const GridHelper = React.memo(GridHelper0)
