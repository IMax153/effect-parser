export interface OptimizerState {
  optimized: Map<Parser<any, any, any>, Parser<any, any, any>>
  visited: Map<Parser<any, any, any>, number>
  autoBacktrack: boolean
}
