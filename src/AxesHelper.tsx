import React, { useEffect } from "react"
import { Color3, Color4, MeshBuilder, Vector3 } from "@babylonjs/core"
import { useScene } from "react-babylonjs"

export type AxesHelperProps = {
  position: Vector3
  scaling: number
}

export const defaultAxesHelperProps = {
  position: Vector3.Zero(),
  scaling: 50,
}

const red = Color4.FromColor3(Color3.Red())
const green = Color4.FromColor3(Color3.Green())
const blue = Color4.FromColor3(Color3.Blue())

const AxesHelper0: React.VFC<AxesHelperProps> = (props): null => {
  const scene = useScene()

  useEffect(() => {
    if (!scene) {
      return
    }

    const o = props.position
    const x = new Vector3(o.x + props.scaling, o.y, o.z)
    const y = new Vector3(o.x, o.y + props.scaling, o.z)
    const z = new Vector3(o.x, o.y, o.z + props.scaling)

    const xAxis = MeshBuilder.CreateLines(
      "x-axis",
      {
        points: [o, x],
        colors: [red, red],
        updatable: false,
        useVertexAlpha: false,
      },
      scene
    )
    const yAxis = MeshBuilder.CreateLines(
      "y-axis",
      {
        points: [o, y],
        colors: [green, green],
        updatable: false,
        useVertexAlpha: false,
      },
      scene
    )
    const zAxis = MeshBuilder.CreateLines(
      "z-axis",
      {
        points: [o, z],
        colors: [blue, blue],
        updatable: false,
        useVertexAlpha: false,
      },
      scene
    )

    return () => {
      xAxis.dispose()
      yAxis.dispose()
      zAxis.dispose()
    }
  }, [props.position, props.scaling, scene])

  return null
}

export const AxesHelper = React.memo(AxesHelper0)
