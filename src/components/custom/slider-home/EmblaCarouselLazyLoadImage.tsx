import React, { useState, useCallback } from 'react'

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`

type PropType = {
  imgSrc: string
  inView: boolean
  index: number
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView } = props
  const [hasLoaded, setHasLoaded] = useState(false)

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true)
  }, [inView, setHasLoaded])

  return (
    <div className="embla-slider__slide">
      <div
        className={'embla-slider__lazy-load'.concat(
          hasLoaded ? ' embla-slider__lazy-load--has-loaded' : ''
        )}
      >
        {!hasLoaded && <span className="embla-slider__lazy-load__spinner" />}
        <img
          className="embla-slider__slide__img embla-slider__lazy-load__img"
          onLoad={setLoaded}
          src={inView ? imgSrc : PLACEHOLDER_SRC}
          alt="Your alt text"
          data-src={imgSrc}
        />
      </div>
    </div>
  )
}
