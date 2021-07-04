export const PartyStubs = {
  Party: 'stub-party-36844.json',
  OneParty: 'stub-parties-one.json',
  Deputies: 'stub-deputies-with-leader.json'
}

export function queryPartyById(id: string): string {
  return `query {
    party(id:"${id}") {
      id
      name
      uri
    }
  }`
}

export function queryPartyByAcronym(acronym: string): string {
  return `query {
	partyByAcronym(acronym:"${acronym}") {
    id
    name
    acronym
  }
}
`
}

export function queryPartyWithLeader(id: string): string {
  return `query {
    party(id:"${id}") {
      id
      name
      uri
      leader {
        id
        name
      }
    }
  }`
}

export function querySearchParties(acronym: string): string {
  return `query {
	parties(acronym:"${acronym}", page: 1, orderBy: NAME, order: DESC) {
  	pageInfo {
      hasNextPage
    }
    edges {
      node {
        id
        name
        acronym
      }
    }
  }
}
`
}
