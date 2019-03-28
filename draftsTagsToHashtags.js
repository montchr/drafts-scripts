/* global draft */

const { content, tags } = draft;
const spacelessTags = tags.map(tag => tag.replace(' ', ''));
console.log(spacelessTags);

const re = /#[\w\d]+/g;
const hashtags = content.match(re);
console.log(hashtags);

const hashlessHashtags = hashtags.map(tag => tag.replace('#', ''));
console.log(hashlessHashtags);

// Get the draft tags that don't already have hashtag equivalents in the content
// and append them to the current draft's content
const newTags = spacelessTags.filter(tag => !hashlessHashtags.includes(tag));
console.log(newTags);

if (newTags.length > 0) {
  const newHashtags = newTags.map(tag => `#${tag}`);
  console.log(newHashtags);

  draft.content += newHashtags.join(' ');
}

console.log(draft.content);
