import { Base64Message } from './Base64Message'
import { Edge, Tree, TreeNode } from './'

export abstract class TreeNodeFactory {
  private static messageCounter = 0
  public static insertNodeAtPosition<ViewModel>(edgeNames: Array<string>, node: TreeNode<ViewModel>) {
    let currentNode: TreeNode<ViewModel> = new Tree()
    let edge
    for (const edgeName of edgeNames) {
      edge = new Edge<ViewModel>(edgeName)
      currentNode.addEdge(edge)
      currentNode = new TreeNode(edge)
      edge.target = currentNode
    }
    node.sourceEdge = edge
    node.sourceEdge!.target = node
  }

  public static fromEdgesAndValue<ViewModel>(edgeNames: Array<string>, value?: Base64Message | null): TreeNode<ViewModel> {
    const node = new TreeNode<ViewModel>()
    node.setMessage({
      value: value || undefined,
      length: value ? value.length : 0,
      received: new Date(),
      messageNumber: this.messageCounter,
    })
    this.messageCounter += 1

    this.insertNodeAtPosition<ViewModel>(edgeNames, node)

    return node
  }
}
