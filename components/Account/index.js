import React from 'react'
import { compose, graphql } from 'react-apollo'

import withT from '../../lib/withT'
import withMe from '../../lib/apollo/withMe'

import Loader from '../Loader'
import UpdateMe from './UpdateMe'
import UpdateProfile from './UpdateProfile'
import UpdateTestimonial from './UpdateTestimonial'
import PledgeList from './PledgeList'

import { H1, Interaction } from '@project-r/styleguide'

import query from './belongingsQuery'

import ClaimedMemberships from './Memberships/List'

const { H2 } = Interaction

const Account = ({ loading, error, me, t, query, hasMemberships, hasPledges, merci }) => (
  <Loader
    loading={loading}
    error={error}
    render={() => {
      const eligibleForTestimonial = hasMemberships || hasPledges
      return (
        <div>
          {!merci && <H1>
            {t('Account/title', {
              nameOrEmail: me.name || me.email
            })}
          </H1>}
          <ClaimedMemberships />
          {eligibleForTestimonial &&
            <UpdateTestimonial style={{marginBottom: 40, marginTop: 40}} />
          }
          <UpdateProfile style={{marginBottom: 40}} />

          {(hasPledges || !hasMemberships) && (
            <H2 style={{marginTop: 80}}>{t('account/pledges/title')}</H2>
          )}
          <PledgeList highlightId={query.id} />
          <UpdateMe />
        </div>
      )
    }}
  />
)

export default compose(
  withMe,
  withT,
  graphql(query, {
    props: ({data}) => {
      return {
        loading: data.loading,
        error: data.error,
        hasPledges: (
          (
            !data.loading &&
            !data.error &&
            data.me &&
            data.me.pledges &&
            !!data.me.pledges.length
          )
        ),
        hasMemberships: (
          (
            !data.loading &&
            !data.error &&
            data.me &&
            data.me.memberships &&
            !!data.me.memberships.length
          )
        )
      }
    }
  })
)(Account)
