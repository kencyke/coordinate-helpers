import React, { useRef } from "react"
import { Color3, Mesh, Nullable, Vector3 } from "@babylonjs/core"
import { useBeforeRender } from "react-babylonjs"

export type SpinningBoxProps = {
  name: string
  position: Vector3
  color: Color3
}

const SpinningBox0: React.VFC<SpinningBoxProps> = (props) => {
  const boxRef = useRef<Nullable<Mesh>>(null)

  const rpm = 5
  useBeforeRender((scene) => {
    if (boxRef.current) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime()
      boxRef.current.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
    }
  })

  return (
    <box name={props.name} ref={boxRef} size={2} position={props.position}>
      <standardMaterial name={`${props.name}-mat`} diffuseColor={props.color} specularColor={Color3.Black()} />
    </box>
  )
}

export const SpinningBox = React.memo(SpinningBox0)
