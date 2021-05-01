import React from "react"
import { Color3, Vector3 } from "@babylonjs/core"
import { Engine, Scene } from "react-babylonjs"
import "./App.css"
import { defaultGridHelperProps, GridHelper } from "./GridHelper"
import { SpinningBox } from "./SpinningBox"
import { AxesHelper, defaultAxesHelperProps } from "./AxesHelper"

const App: React.VFC = () => {
  return (
    <Engine antialias adaptToDeviceRatio canvasId="renderCanvas">
      <Scene>
        <arcRotateCamera name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={8} />
        <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
        <SpinningBox name="box1" position={Vector3.Zero()} color={Color3.FromHexString("#C8F4F9")} />
        <GridHelper {...defaultGridHelperProps} />
        <AxesHelper {...defaultAxesHelperProps} />
      </Scene>
    </Engine>
  )
}

export default App
