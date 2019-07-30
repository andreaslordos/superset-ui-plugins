/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;

  const {
    colorScheme,
    curveEnabled,
    dynamicHeight,
    dynamicSlope,
    highlight,
    inverted,
    labelFormat,
    tooltipEnabled,
    tooltipFormat,
  } = formData;

  let { bottomPinch, curveHeight, fillType, fontSize, minHeight } = formData;

  bottomPinch = parseInt(bottomPinch, 10);
  curveHeight = parseInt(curveHeight, 10);
  minHeight = parseInt(minHeight, 10);
  fontSize = `${fontSize.toString()}px`;
  fillType = fillType === true ? 'gradient' : 'solid'; // if fillType is true, set it to gradient

  return {
    bottomPinch,
    colorScheme,
    curveEnabled,
    curveHeight,
    data: payload.data,
    dynamicHeight,
    dynamicSlope,
    fillType,
    fontSize,
    height,
    highlight,
    inverted,
    labelFormat,
    minHeight,
    tooltipEnabled,
    tooltipFormat,
    width,
  };
}
