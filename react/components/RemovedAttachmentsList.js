import React, { Fragment } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import { arrayOf } from 'prop-types'

import AttachmentItem from './AttachmentItem'

import { removedOptionShape } from '../utils/propTypes'

const wasCompletelyRemoved = ({ removedQuantity, initialQuantity }) => 
removedQuantity === 1 && removedQuantity === initialQuantity

const formatAttachmentName = (missingOption, intl) => {
  const { name, removedQuantity } = missingOption
  if (wasCompletelyRemoved(missingOption)) {
    return intl.formatMessage({ id: 'productSummary.missingOptionName' }, { name })
  }

  const extraParams = {
    sign: '-',
    name,
    quantity: removedQuantity,
  }
  return intl.formatMessage({ id: 'editor.productSummary.attachmentName' }, extraParams)
}

const RemovedAttachmentsList = ({
  removedOptions,
  intl,
}) => {
  if (removedOptions.length === 0) {
    return null
  }

  return (
    <Fragment>
      {removedOptions.map(removedOption => 
        <AttachmentItem productText={formatAttachmentName(removedOption, intl)} key={productText} />
      )}
    </Fragment>
  )
}

RemovedAttachmentsList.propTypes = {
  removedOptions: arrayOf(removedOptionShape).isRequired,
  intl: intlShape,
}

export default injectIntl(RemovedAttachmentsList)
