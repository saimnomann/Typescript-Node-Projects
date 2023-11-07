# react-nano-spinner [![NPM version](https://img.shields.io/npm/v/react-nano-spinner.svg?style=flat)](https://www.npmjs.com/package/react-nano-spinner) ![Gzipped size](https://img.shields.io/badge/gzipped-0.6kb-brightgreen.png)

A tiny no-configuration (and not configurable) spinner.

Spinner and CSS is based on SpinKit's "three-bounce".

License: https://github.com/tobiasahlin/SpinKit/blob/master/LICENSE

## Usage

Install it with yarn or npm:

`yarn add react-nano-spinner` or `npm install --save react-nano-spinner`

    import Spinner from 'react-nano-spinner';

    ...
    render() {
        return (
            <div>
                <Spinner />
            </div>
        )
    }
    ...

To style it simply override `.nano-spinner-bounce` in your css or supply a className, example: `<Spinner className="your-extra-class" />`

## Why

For me to learn to publish a npm module and test rollup/rollup-starter-project
