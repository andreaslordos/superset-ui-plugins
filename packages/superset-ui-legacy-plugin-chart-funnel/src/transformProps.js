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
  try {
    var { width, height, rawFormData, payload } = chartProps;
    var formData = rawFormData;
  } catch (err) {
    var { width, height, formData, payload } = chartProps;
  }
  var {
    bottom_pinch,
    dynamic_height,
    dynamic_slope,
    inverted,
    fill_type,
    min_height,
    highlight,
    font_size,
    curve_enabled,
    curve_height,
    tooltip_enabled,
    tooltip_format,
    label_format,
    color_scheme,
  } = formData;
  console.log(chartProps);
  bottom_pinch = parseInt(bottom_pinch);
  curve_height = parseInt(curve_height);
  font_size = font_size.toString() + 'px';
  min_height = parseInt(min_height);

  if (fill_type == true) {
    fill_type = 'gradient';
  } else {
    fill_type = 'solid';
  }

  return {
    width,
    height,
    data: payload.data,
    bottom_pinch,
    dynamic_height,
    dynamic_slope,
    inverted,
    fill_type,
    min_height,
    highlight,
    font_size,
    curve_enabled,
    curve_height,
    tooltip_enabled,
    tooltip_format,
    label_format,
    color_scheme,
  };
}
