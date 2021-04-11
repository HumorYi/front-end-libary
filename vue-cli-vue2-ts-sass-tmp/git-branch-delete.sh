#!/bin/bash

array=()

for element in ${array[@]}
do
  git branch -d $element
  git push origin --delete $element
done