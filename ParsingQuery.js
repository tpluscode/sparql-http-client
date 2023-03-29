import getStream from 'get-stream'
import StreamQuery from './StreamQuery.js'

/**
 * Extends StreamQuery by materialising the SPARQL response streams
 */
export default class ParsingQuery extends StreamQuery {
  /**
   * @param {Object} init
   * @param {Endpoint} init.endpoint
   */
  constructor ({ endpoint }) {
    super({ endpoint })
  }

  /**
   * Performs a query which returns triples
   *
   * @param {string} query
   * @param {Object} [options]
   * @param {HeadersInit} [options.headers] HTTP request headers
   * @param {'get'|'postUrlencoded'|'postDirect'} [options.operation='get']
   * @return {Promise<Quad[]>}
   */
  async construct (query, options = {}) {
    const stream = await super.construct(query, options)

    return getStream.array(stream)
  }

  /**
   * Performs a SELECT query which returns binding tuples
   *
   * @param {string} query
   * @param {Object} [options]
   * @param {HeadersInit} [options.headers] HTTP request headers
   * @param {'get'|'postUrlencoded'|'postDirect'} [options.operation='get']
   * @return {Promise<Array<Object.<string, Term>>>}
   */
  async select (query, options = {}) {
    const stream = await super.select(query, options)

    return getStream.array(stream)
  }
}
