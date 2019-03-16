
import kindOf from 'kind-of';

const isDefined = v => v !== null && v !== undefined;
const isUndefined = v => v === null || v === undefined;

const is = {
  Undefined: isUndefined,
  Defined: isDefined,
  Element: v => !!( v && v.nodeType === 1 ),
};

[
  'Array', 'Number', 'Function','RegExp',
  'Boolean', 'Date','Error','Arguments',
  'Null', 'String'
].forEach( name => {
  is[name] = v => kindOf( v ) === name.toLowerCase();
});

export default is;
